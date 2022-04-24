namespace TrackTor.Dtos
{
    /// <summary>
    /// Интерфейс для создания конвертеров Dto -> Model
    /// </summary>
    /// <typeparam name="ModelT">Класс модели</typeparam>
    /// <typeparam name="DtoT">Класс dto</typeparam>
    public interface IDtoConverter<ModelT, CreateDtoT, DtoT>
    {
        /// <summary>
        /// Метод для преобразования модели в dto
        /// </summary>
        /// <param name="model">модель</param>
        /// <returns>dto для переданной модели</returns>
        DtoT Convert(ModelT model);

        /// <summary>
        /// Метод для преобразования dto в модель
        /// </summary>
        /// <param name="dto">dto</param>
        /// <returns>модель для переданного dto</returns>
        ModelT Convert(CreateDtoT dto);
    }
}