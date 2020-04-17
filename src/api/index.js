import axios from 'axios';


const url = 'https://covid19.mathdro.id/api';
const urlDaily = 'https://covid19.mathdro.id/api/daily';
const urlCountries = 'https://covid19.mathdro.id/api/countries';

export const fetchData = async (country) => {
    let changableUrl=url;

    if(country){
        changableUrl=urlCountries;
        changableUrl=changableUrl.concat('/',country);
        console.log(changableUrl);
        
    }

    try {
            const { data: {confirmed, recovered, deaths, lastUpdate } } = await axios.get(changableUrl);

            const modifiedData = {confirmed, recovered, deaths, lastUpdate };

            return modifiedData;

    } catch(error){
        console.log(error);
    }

}


export const fetchDailyData = async () => {

    try{    
        const { data } = await axios.get(urlDaily);

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));

        return modifiedData;

    }catch(error){

    }

}

export const fetchCountries = async () => {

    try{    
        const { data: { countries } }  = await axios.get(urlCountries);

        return countries.map((country) => country.name);

    }catch(error){
        console.log(error);
    }

}

