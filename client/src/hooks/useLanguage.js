import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../store";

const useLanguage = () => {
    const isEng = useSelector(selectors.getLang());
    const dispatch = useDispatch();
    const location = useLocation();

    const selectedRecipeId = useSelector(selectors.getSelectedRecipeId());

    useEffect(changeLanguage,[isEng, selectedRecipeId, location.pathname]);

    const lang = isEng ? 'en' : 'ua';

    const languages = {
        "app-title" : {
            "en" : "Cooking Recipes App",
            "ua" : "Додаток Рецептів"
        },
        "recipe-add-button" : {
            "en" : "Add recipe",
            "ua" : "Додати"
        },
        "recipe-delete-button" : {
            "en" : "Delete",
            "ua" : "Видалити"
        },
        "recipe-cancel-button" : {
            "en" : "Cancel",
            "ua" : "Відміна"
        },
        "recipe-save-button" : {
            "en" : "Save",
            "ua" : "Зберегти"
        },
        "recipe-edit-button" : {
            "en" : "Edit",
            "ua" : "Змінити"
        },
        "ingredient-add-button" : {
            "en" : "Add ingredient",
            "ua" : "Додати інгредієнт"
        },
        "recipe-time" : {
            "en" : "Cook time",
            "ua" : "Час приготування"
        },
        "recipe-instructions" : {
            "en" : "Instructions",
            "ua" : "Інструкція"
        },
        "recipe-ingredients" : {
            "en" : "Ingredients",
            "ua" : "Інгредієнти"
        },
        "recipe-edit-title" : {
            "en" : "Name",
            "ua" : "Назва"
        },
        "recipe-edit-time" : {
            "en" : "Cook time",
            "ua" : "Час"
        },
        "recipe-edit-instructions" : {
            "en" : "Instructions",
            "ua" : "Інструкція"
        },
        "recipe-edit-ingredients" : {
            "en" : "Ingredients",
            "ua" : "Інгредієнти"
        },
        "recipe-ingredient-edit-name" : {
            "en" : "Name",
            "ua" : "Назва"
        },
        "recipe-ingredient-edit-amount" : {
            "en" : "Amount",
            "ua" : "Кількість"
        },
        "logout__button" : {
            "en" : "Log out",
            "ua" : "Вийти"
        },
        "theme-title" : {
            "en" : "Dark Mode",
            "ua" : "Темний режим"
        },
        "lang-title" : {
            "en" : "EN",
            "ua" : "Укр"
        },
        "sign-in-button" : {
            "en" : "Sign-in",
            "ua" : "Ввійти"
        },
        "sign-up-button" : {
            "en" : "Sign-up",
            "ua" : "Реєстрація"
        },
        "create-account" : {
            "en" : "Create an account",
            "ua" : "Створити акаунт"
        },
        "go-to-login" : {
            "en" : "Go to login",
            "ua" : "Перейти на логін"
        },
        "login-auth-form" : {
            "en" : "Login form",
            "ua" : "Форма логіну"
        },
        "signup-auth-form" : {
            "en" : "Sign-up form",
            "ua" : "Форма реєстрації"
        },
        "auth-form-email" : {
            "en" : "Email",
            "ua" : "Пошта"
        },
        "auth-form-pass" : {
            "en" : "Password",
            "ua" : "Пароль"
        },
        "auth-form-email-placeholder" : {
            "en" : "Enter your email",
            "ua" : "Введіть вашу пошту"
        },
        "auth-form-pass-placeholder" : {
            "en" : "Enter your password",
            "ua" : "Введіть пароль"
        },
        "search-placeholder" : {
            "en" : "Type the recipe name",
            "ua" : "Введіть назву рецепту"
        },
    };

    function handleToggle() {
        dispatch(actions.setLang(!isEng));
    }

    function changeLanguage() {
        document.querySelector("title").textContent = languages["app-title"][lang];
        for (const key in languages) {
            let elem = document.querySelector(`.${key}`);
            if (elem) {
                elem.innerText = languages[key][lang];
            }
        }
    }

    return {isEng, handleToggle};
};

export default useLanguage;