export let required = (value) => {
    if (!value) {
        return 'Поле обязательно';
    }
    return undefined;
}