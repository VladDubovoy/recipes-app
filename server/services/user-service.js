import UserModel from "../models/user-model.js";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";

class UserService {
    async registration (email, password) {
        const candidate = await UserModel.findOne({ email: email});
        if (candidate) {
            throw ApiError.BadRequest("Email is already used")
        }
        const hashPassword = await bcrypt.hash(password, 7);
        const activationLink = uuidv4();
        const user = await UserModel.create( { email, password: hashPassword, activationLink } );
        await mailService.sendActivationMail( email, `${process.env.API_URL}/api/activate/${activationLink}` );
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken );
        return { ...tokens, user: userDto };
    }

    async login(email, password) {
        const user = await UserModel.findOne( { email } );
        if ( !user ) {
            throw ApiError.BadRequest('Email is not correct');
        }
        const arePasswordsEqual = await bcrypt.compare(password, user.password);
        if ( !arePasswordsEqual ){
            throw ApiError.BadRequest('Password is not correct');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken );
        return { ...tokens, user: userDto };
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Activation link is not valid')
        }
        user.isActivated = true;
        await user.save();
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken );
        return { ...tokens, user: userDto };
    }

    async getAllUsers(){
        const users = await UserModel.find();
        return users;
    }

    async updateTheme(isDarkTheme, email) {
        const user = await UserModel.findOne( { email } );
        if ( !user ) {
            throw ApiError.BadRequest('User is not found');
        }
        user.isDarkTheme = isDarkTheme;
        await user.save();
        return user;
    }

    async getTheme(email) {
        const user = await UserModel.findOne( { email } );
        if ( !user ) {
            throw ApiError.BadRequest('User is not found');
        }
        return user;
    }
}

export default new UserService();