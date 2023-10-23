class Price {
    constructor(){

    }

    convertToMoney(number) {
        if (number < 1000000000) return number.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        if(number >=  1000000000 && number <  1000000000000) return (number/1000000000).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) + " bilhões R$";
        if(number >=  1000000000000) return (number/1000000000000).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }) + " trilhões R$";
    }
}

export const hprice = new Price();