using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Models
{
    public class ServerResponses
    {
        public static string UserWasCreated = "Пользователь успешно создан";
        public static string LoginWasExisted = "Пользователь с таким логином уже зарегистрирован";
        public static string LogInDataError = "Неверный логин или пароль";
        public static string ElementWasAdded = "Параметр добавлен в систему";
        public static string ElementWasExisted = "Такой параметр уже существует";
        public static string BadRequest = "Сервер не умеет обрабатывать такие запросы";
    }
}
