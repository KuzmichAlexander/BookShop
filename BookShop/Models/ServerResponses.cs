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
        
        
        public static string AddStartBook = "Данные обрабатываются, пожалуйста подождите...";
        public static string AddAuthorsGenres = "Все параметры книги успешно дабавлены";
        public static string SameBookName = "Книга с таким названием уже существует";
        
        
        public static string NoFoundBookName = "Книги с таким названием не существует";
        public static string PayOperationSuccess = "Транзакция прошла успешно.";
        
        public static string OrderSuccess = "Заказ прошёл успешно, ожидайте поступления";
        
        public static string StorageReject(string name)
        {
            return $"Похоже что {name} уже раскупили и такого колличества книг нет на складе. Все транзакции отменены!";
        }

        public static string AddInStorage(int count, string name)
        {
            return $"На склад поступило {count} книг '{name}'";
        }

        public static string ChangePasswordSuccess = "Пароль успешно изменен";
        public static string ChangePasswordError = "Неверно введен старый пароль";
        public static string ChangePasswordIsSame = "Введенные пароли совпадают";
    }
}
