import "./App.css";

import React, { useEffect, useState } from "react";
import axios from "axios";

import moment from "moment";

import {BiChevronDown, BiChevronUp} from 'react-icons/bi';

export const App = () => {
  const [output, setOutput] = useState([]);

  const [cidadeTotal, setCidadeTotal] = useState([]);

  const [cidade, setCidade] = useState("Porto");
  const [cidadeShow, setCidadeShow] = useState("Porto");
  const [pais, setPais] = useState("Portugal");
  const [paisShow, setPaisShow] = useState("Portugal");

  const [isOpenCountry, setIsOpenCountry] = useState(false);
  const [isOpenCity, setIsOpenCity] = useState(false);

  const [src, setSrc] = useState(
    "https://images.pexels.com/photos/2124682/pexels-photo-2124682.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  );

  const date_create = moment().format("DD / MM / YYYY")

  const enviarCidade = cidade => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather?", {
        params: {
          appid: "d81fdf5c0b42cb5e150f26b513b6df64",
          units: "metric",
          q: `${cidade},${pais.acro}`
        }
      })
      .then(res => {
        setOutput({temp: parseInt(res.data.main.temp), weather: res.data.weather[0].description, feels: parseInt(res.data.main.feels_like), wind: res.data.wind.speed});
        setCidadeShow(cidade);
      })
      .catch(() => {
        setOutput("0");
      });
  };

  useEffect(
    () => {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/cities", {
          country: `${pais.pais}`
        })
        .then(res => {
          setCidadeTotal(res.data.data);
        });
    },
    [pais]
  );

  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather?", {
        params: {
          appid: "d81fdf5c0b42cb5e150f26b513b6df64",
          units: "metric",
          q: `Porto,Portugal`
        }
      })
      .then(res => {
        setOutput({temp: parseInt(res.data.main.temp), weather: res.data.weather[0].description, feels: parseInt(res.data.main.feels_like), wind: res.data.wind.speed});
        setCidadeShow(cidade);
      })
      .catch(() => {
        setOutput("0");
      });
  }, [])
  

  const handleCidade = cidade => {
    setCidade(cidade);
    setCidadeShow(cidade);
    handleOpenCity();
  };
  const handlePais = (pais, acro, source) => {
    setPais({ pais: pais, acro: acro });
    setPaisShow(pais);
    setSrc(source);
    setCidade("");
    setCidadeShow("Cidades");
    handleOpenCountry();
  };

  const handleOpenCountry = () => {
    setIsOpenCountry(!isOpenCountry);
  };

  const handleOpenCity = () => {
    setIsOpenCity(!isOpenCity);
  };

  const sectionStyle = {
    backgroundImage: "url(" + src +")"
  }

  return (
    <div className="App" style={sectionStyle}>
      <div className="inputCidadePais">
        <div className="paises-full">
          <div onClick={() => handleOpenCountry()} className={isOpenCountry ? "paises-button-show" : "paises-button"}>
            <h1 id="pais">
              {paisShow}
            </h1>
            {isOpenCountry ? <BiChevronUp size={32}/> : <BiChevronDown size={32}/>}
          </div>
          <div className={isOpenCountry ? "pais-menu-show" : "pais-menu"}>
            {paises.map(pais =>
              <div
                className="cidades"
                key={pais.alpha2}
                onClick={() => handlePais(pais.name, pais.alpha2, pais.src)}
              >
                {pais.name}
              </div>
            )}
          </div>
        </div>
        <div className="cidades-full">
          <div>
            <div onClick={() => handleOpenCity()} className={isOpenCity ? "cidade-button-show" : "cidade-button"}>
              <h1 id="cidade">{cidadeShow}</h1>
              {isOpenCity ? <BiChevronUp size={32}/> : <BiChevronDown size={32}/>}
            </div>
          </div>
          <div className={isOpenCity ? "cidade-menu-show" : "cidade-menu"}>
            {cidadeTotal.map(cidade =>
              <div
                className="cidades"
                key={cidade}
                onClick={() => handleCidade(cidade)}
              >
                {cidade}
              </div>
            )}
          </div>
        </div>
        <button onClick={() => enviarCidade(cidade)}>Search</button>
      </div>
      <div className="outputBG">
        <div className="outputName">
            <span>{cidadeShow}, {paisShow}</span>
        </div>
        <div className="outputCidadePais">
          <div className="temp">
            {output.temp}º
          </div>
          <div className="extra">
            <div className="extra-row">
              <span>WEATHER</span>
              <span id="value">{output.weather}</span>
            </div>
            <div className="extra-row">
              <span>FEELS LIKE</span>
              <span id="value">{output.feels}º</span>
            </div>
            <div className="extra-row">
              <span>WIND</span>
              <span id="value">{output.wind}Km/h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const paises = [
  { id: 4, alpha2: "af", alpha3: "afg", name: "Afghanistan", src:"https://images.pexels.com/photos/1484776/pexels-photo-1484776.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 8, alpha2: "al", alpha3: "alb", name: "Albania", src:"https://images.pexels.com/photos/11126448/pexels-photo-11126448.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" },
  { id: 12, alpha2: "dz", alpha3: "dza", name: "Algeria", src:"https://images.pexels.com/photos/9351229/pexels-photo-9351229.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 20, alpha2: "ad", alpha3: "and", name: "Andorra", src:"https://images.pexels.com/photos/5828196/pexels-photo-5828196.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" },
  { id: 24, alpha2: "ao", alpha3: "ago", name: "Angola", src:"https://images.pexels.com/photos/2767923/pexels-photo-2767923.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 28, alpha2: "ag", alpha3: "atg", name: "Antigua and Barbuda", src:"https://images.pexels.com/photos/4911670/pexels-photo-4911670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 32, alpha2: "ar", alpha3: "arg", name: "Argentina", src:"https://images.pexels.com/photos/1060803/pexels-photo-1060803.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 51, alpha2: "am", alpha3: "arm", name: "Armenia", src:"https://images.pexels.com/photos/4402879/pexels-photo-4402879.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 36, alpha2: "au", alpha3: "aus", name: "Australia", src:"https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 40, alpha2: "at", alpha3: "aut", name: "Austria", src:"https://images.pexels.com/photos/356807/pexels-photo-356807.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 31, alpha2: "az", alpha3: "aze", name: "Azerbaijan", src:"https://images.pexels.com/photos/2716795/pexels-photo-2716795.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 44, alpha2: "bs", alpha3: "bhs", name: "Bahamas", src:"https://images.pexels.com/photos/2598721/pexels-photo-2598721.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 48, alpha2: "bh", alpha3: "bhr", name: "Bahrain", src:"https://images.pexels.com/photos/6658661/pexels-photo-6658661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 50, alpha2: "bd", alpha3: "bgd", name: "Bangladesh", src:"https://images.pexels.com/photos/2382889/pexels-photo-2382889.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 52, alpha2: "bb", alpha3: "brb", name: "Barbados", src:"https://images.pexels.com/photos/8920863/pexels-photo-8920863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 112, alpha2: "by", alpha3: "blr", name: "Belarus", src:"https://images.pexels.com/photos/3442567/pexels-photo-3442567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 56, alpha2: "be", alpha3: "bel", name: "Belgium", src:"https://images.pexels.com/photos/1595085/pexels-photo-1595085.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
  { id: 84, alpha2: "bz", alpha3: "blz", name: "Belize", src:"https://images.pexels.com/photos/9845438/pexels-photo-9845438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 204, alpha2: "bj", alpha3: "ben", name: "Benin", src:""},
  { id: 64, alpha2: "bt", alpha3: "btn", name: "Bhutan", src:"https://images.pexels.com/photos/2810269/pexels-photo-2810269.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  {
    id: 68,
    alpha2: "bo",
    alpha3: "bol",
    name: "Bolivia",
    src:"https://images.pexels.com/photos/8313945/pexels-photo-8313945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  { id: 70, alpha2: "ba", name: "Bosnia and Herzegovina", src:"https://images.pexels.com/photos/3765354/pexels-photo-3765354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 72, alpha2: "bw", name: "Botswana", src:"https://images.pexels.com/photos/5125390/pexels-photo-5125390.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 76, alpha2: "br", name: "Brazil", src:"https://images.pexels.com/photos/161212/rio-de-janeiro-olympics-2016-niteroi-brazil-161212.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 96, alpha2: "bn", name: "Brunei Darussalam", src:"https://images.pexels.com/photos/6613502/pexels-photo-6613502.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 100, alpha2: "bg", name: "Bulgaria",src:"https://images.pexels.com/photos/1624216/pexels-photo-1624216.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 854, alpha2: "bf", name: "Burkina Faso", src:"https://www.onde-e-quando.net/site/images/illustration/burkina-faso_962.jpg" },
  { id: 108, alpha2: "bi", name: "Burundi", src:"https://images.pexels.com/photos/11139375/pexels-photo-11139375.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 132, alpha2: "cv", name: "Cabo Verde", src:"https://images.pexels.com/photos/3364386/pexels-photo-3364386.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 116, alpha2: "kh", name: "Cambodia", src:"https://images.pexels.com/photos/3217663/pexels-photo-3217663.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 120, alpha2: "cm", name: "Cameroon", src:"https://assets.wego.com/image/upload/v1611848131/country-pages/cm.jpg"},
  { id: 124, alpha2: "ca", name: "Canada", src:"https://images.pexels.com/photos/1868676/pexels-photo-1868676.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 140, alpha2: "cf", name: "Central African Republic",src:"https://images.pexels.com/photos/6567674/pexels-photo-6567674.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 148, alpha2: "td", name: "Chad",src:""},
  { id: 152, alpha2: "cl", name: "Chile",src:"https://images.pexels.com/photos/2017747/pexels-photo-2017747.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 156, alpha2: "cn", name: "China",src:"https://images.pexels.com/photos/19872/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 170, alpha2: "co", name: "Colombia",src:"https://images.pexels.com/photos/1559699/pexels-photo-1559699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 174, alpha2: "km", name: "Comoros" },
  { id: 178, alpha2: "cg", name: "Congo" },
  { id: 188, alpha2: "cr", name: "Costa Rica", src:"https://images.pexels.com/photos/3066240/pexels-photo-3066240.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 384, alpha2: "ci", name: "Côte d'Ivoire", src:"https://images.pexels.com/photos/3872479/pexels-photo-3872479.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 191, alpha2: "hr", name: "Croatia", src:"https://images.pexels.com/photos/580897/pexels-photo-580897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 192, alpha2: "cu", name: "Cuba", src:"https://images.pexels.com/photos/4226100/pexels-photo-4226100.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 196, alpha2: "cy", name: "Cyprus",src:"https://images.pexels.com/photos/1693945/pexels-photo-1693945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 203, alpha2: "cz", name: "Czechia", src:"https://images.pexels.com/photos/771023/pexels-photo-771023.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 208, alpha2: "dk", name: "Denmark", src:"https://images.pexels.com/photos/8888939/pexels-photo-8888939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 262, alpha2: "dj", name: "Djibouti" },
  { id: 212, alpha2: "dm", name: "Dominica", src:"https://images.pexels.com/photos/2598675/pexels-photo-2598675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 214, alpha2: "do", name: "Dominican Republic", src:"https://images.pexels.com/photos/5324386/pexels-photo-5324386.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 218, alpha2: "ec", name: "Ecuador", src:"https://images.pexels.com/photos/9791408/pexels-photo-9791408.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 818, alpha2: "eg", name: "Egypt", src:"https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 222, alpha2: "sv", name: "El Salvador", src:"https://images.pexels.com/photos/1076240/pexels-photo-1076240.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 226, alpha2: "gq", name: "Equatorial Guinea" },
  { id: 232, alpha2: "er", name: "Eritrea" },
  { id: 233, alpha2: "ee", name: "Estonia", src:"https://images.pexels.com/photos/5534595/pexels-photo-5534595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 748, alpha2: "sz", name: "Eswatini" },
  { id: 231, alpha2: "et", name: "Ethiopia" },
  { id: 242, alpha2: "fj", name: "Fiji", src:"https://images.pexels.com/photos/9482126/pexels-photo-9482126.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 246, alpha2: "fi", name: "Finland", src:"https://images.pexels.com/photos/3594963/pexels-photo-3594963.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 250, alpha2: "fr", name: "France", src:"https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 266, alpha2: "ga", name: "Gabon" },
  { id: 270, alpha2: "gm", name: "Gambia" },
  { id: 268, alpha2: "ge", name: "Georgia", src:"https://images.pexels.com/photos/2990775/pexels-photo-2990775.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 276, alpha2: "de", name: "Germany", src:"https://images.pexels.com/photos/547494/pexels-photo-547494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 288, alpha2: "gh", name: "Ghana" },
  { id: 300, alpha2: "gr", name: "Greece", src:"https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 308, alpha2: "gd", name: "Grenada" },
  { id: 320, alpha2: "gt", name: "Guatemala" },
  { id: 324, alpha2: "gn", name: "Guinea" },
  { id: 624, alpha2: "gw", name: "Guinea-Bissau" },
  { id: 328, alpha2: "gy", name: "Guyana" },
  { id: 332, alpha2: "ht", name: "Haiti" },
  { id: 340, alpha2: "hn", name: "Honduras" },
  { id: 348, alpha2: "hu", name: "Hungary", src:"https://images.pexels.com/photos/47727/budapest-church-architecture-matthias-church-47727.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 352, alpha2: "is", name: "Iceland", src:"https://images.pexels.com/photos/953182/pexels-photo-953182.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 356, alpha2: "in", name: "India", src:"https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 360, alpha2: "id", name: "Indonesia", src:"https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 364, alpha2: "ir", name: "Iran", src:"https://images.pexels.com/photos/3799176/pexels-photo-3799176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 368, alpha2: "iq", name: "Iraq", src:"https://images.pexels.com/photos/10431289/pexels-photo-10431289.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 372, alpha2: "ie", name: "Ireland", src:"https://images.pexels.com/photos/2382681/pexels-photo-2382681.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 376, alpha2: "il", name: "Israel" },
  { id: 380, alpha2: "it", name: "Italy", src:"https://images.pexels.com/photos/2676642/pexels-photo-2676642.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 388, alpha2: "jm", name: "Jamaica", src:"https://images.pexels.com/photos/1030322/pexels-photo-1030322.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 392, alpha2: "jp", name: "Japan", src:"https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 400, alpha2: "jo", name: "Jordan" },
  { id: 398, alpha2: "kz", name: "Kazakhstan" },
  { id: 404, alpha2: "ke", name: "Kenya", src:"https://images.pexels.com/photos/2600207/pexels-photo-2600207.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 296, alpha2: "ki", name: "Kiribati" },
  { id: 410, alpha2: "kr", name: "Korea", src:"https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 414, alpha2: "kw", name: "Kuwait" },
  { id: 417, alpha2: "kg", name: "Kyrgyzstan" },
  { id: 428, alpha2: "lv", name: "Latvia" },
  { id: 422, alpha2: "lb", name: "Lebanon" },
  { id: 426, alpha2: "ls", name: "Lesotho" },
  { id: 430, alpha2: "lr", name: "Liberia" },
  { id: 434, alpha2: "ly", name: "Libya" },
  { id: 438, alpha2: "li", name: "Liechtenstein" },
  { id: 440, alpha2: "lt", name: "Lithuania", src:"https://images.pexels.com/photos/2350345/pexels-photo-2350345.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 442, alpha2: "lu", name: "Luxembourg" },
  { id: 450, alpha2: "mg", name: "Madagascar", src:"https://images.pexels.com/photos/145977/pexels-photo-145977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 454, alpha2: "mw", name: "Malawi" },
  { id: 458, alpha2: "my", name: "Malaysia", src:"https://images.pexels.com/photos/94420/pexels-photo-94420.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 462, alpha2: "mv", name: "Maldives", src:"https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 466, alpha2: "ml", name: "Mali" },
  { id: 470, alpha2: "mt", name: "Malta", src:"https://images.pexels.com/photos/3567189/pexels-photo-3567189.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 584, alpha2: "mh", name: "Marshall Islands" },
  { id: 478, alpha2: "mr", name: "Mauritania" },
  { id: 480, alpha2: "mu", name: "Mauritius" },
  { id: 484, alpha2: "mx", name: "Mexico", src:"https://images.pexels.com/photos/1573471/pexels-photo-1573471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 498, alpha2: "md", name: "Moldova", src:"https://images.pexels.com/photos/205077/pexels-photo-205077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 492, alpha2: "mc", name: "Monaco", src:"https://images.pexels.com/photos/3958980/pexels-photo-3958980.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 496, alpha2: "mn", name: "Mongolia" },
  { id: 499, alpha2: "me", name: "Montenegro", src:"https://images.pexels.com/photos/2932540/pexels-photo-2932540.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 504, alpha2: "ma", name: "Morocco" },
  { id: 508, alpha2: "mz", name: "Mozambique" },
  { id: 104, alpha2: "mm", name: "Myanmar" },
  { id: 516, alpha2: "na", name: "Namibia" },
  { id: 520, alpha2: "nr", name: "Nauru" },
  { id: 524, alpha2: "np", name: "Nepal" },
  { id: 528, alpha2: "nl", name: "Netherlands", src:"https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 554, alpha2: "nz", name: "New Zealand", src:"https://images.pexels.com/photos/2259917/pexels-photo-2259917.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 558, alpha2: "ni", name: "Nicaragua" },
  { id: 562, alpha2: "ne", name: "Niger" },
  { id: 566, alpha2: "ng", name: "Nigeria", src:"https://images.pexels.com/photos/3172830/pexels-photo-3172830.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 807, alpha2: "mk", name: "North Macedonia" },
  { id: 578, alpha2: "no", name: "Norway", src:"https://images.pexels.com/photos/1674624/pexels-photo-1674624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 512, alpha2: "om", name: "Oman" },
  { id: 586, alpha2: "pk", name: "Pakistan", src:"https://images.pexels.com/photos/1590114/pexels-photo-1590114.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 585, alpha2: "pw", name: "Palau" },
  { id: 591, alpha2: "pa", name: "Panama", src:"https://images.pexels.com/photos/2828792/pexels-photo-2828792.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 598, alpha2: "pg", name: "Papua New Guinea" },
  { id: 600, alpha2: "py", name: "Paraguay" },
  { id: 604, alpha2: "pe", name: "Peru", src:"https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 608, alpha2: "ph", name: "Philippines", src:"https://images.pexels.com/photos/210367/pexels-photo-210367.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 616, alpha2: "pl", name: "Poland", src:"https://images.pexels.com/photos/46273/pexels-photo-46273.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 620, alpha2: "pt", name: "Portugal", src:"https://images.pexels.com/photos/290141/pexels-photo-290141.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" },
  { id: 634, alpha2: "qa", name: "Qatar", src:"https://images.pexels.com/photos/5604740/pexels-photo-5604740.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 642, alpha2: "ro", name: "Romania", src:"https://images.pexels.com/photos/3954876/pexels-photo-3954876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 643, alpha2: "ru", name: "Russia", src:"https://images.pexels.com/photos/3934782/pexels-photo-3934782.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 646, alpha2: "rw", name: "Rwanda" },
  { id: 659, alpha2: "kn", name: "Saint Kitts and Nevis" },
  { id: 662, alpha2: "lc", name: "Saint Lucia" },
  { id: 882, alpha2: "ws", name: "Samoa" },
  { id: 674, alpha2: "sm", name: "San Marino", src:"https://images.pexels.com/photos/4977106/pexels-photo-4977106.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 678, alpha2: "st", name: "Sao Tome and Principe" },
  { id: 682, alpha2: "sa", name: "Saudi Arabia", src:"https://images.pexels.com/photos/2830460/pexels-photo-2830460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 686, alpha2: "sn", name: "Senegal" },
  { id: 688, alpha2: "rs", name: "Serbia" },
  { id: 690, alpha2: "sc", name: "Seychelles" },
  { id: 694, alpha2: "sl", name: "Sierra Leone" },
  { id: 702, alpha2: "sg", name: "Singapore", src:"https://images.pexels.com/photos/3914755/pexels-photo-3914755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 703, alpha2: "sk", name: "Slovakia" },
  { id: 705, alpha2: "si", name: "Slovenia" },
  { id: 90, alpha2: "sb", name: "Solomon Islands" },
  { id: 706, alpha2: "so", name: "Somalia" },
  { id: 710, alpha2: "za", name: "South Africa" },
  { id: 728, alpha2: "ss", name: "South Sudan" },
  { id: 724, alpha2: "es", name: "Spain", src:"https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 144, alpha2: "lk", name: "Sri Lanka" },
  { id: 729, alpha2: "sd", name: "Sudan", src:"https://images.pexels.com/photos/5339770/pexels-photo-5339770.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 740, alpha2: "sr", name: "Suriname" },
  { id: 752, alpha2: "se", name: "Sweden", src:"https://images.pexels.com/photos/2377441/pexels-photo-2377441.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 756, alpha2: "ch", name: "Switzerland", src:"https://images.pexels.com/photos/773473/pexels-photo-773473.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
  { id: 760, alpha2: "sy", name: "Syrian Arab Republic" },
  { id: 762, alpha2: "tj", name: "Tajikistan" },
  {
    id: 834,
    alpha2: "tz",
    name: "Tanzania",
    src: "https://images.pexels.com/photos/7001092/pexels-photo-7001092.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  { id: 764, alpha2: "th", name: "Thailand", src:"https://images.pexels.com/photos/460376/pexels-photo-460376.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 626, alpha2: "tl", name: "Timor-Leste" },
  { id: 768, alpha2: "tg", name: "Togo" },
  { id: 776, alpha2: "to", name: "Tonga" },
  { id: 780, alpha2: "tt", name: "Trinidad and Tobago" },
  { id: 788, alpha2: "tn", name: "Tunisia", src:"https://images.pexels.com/photos/891125/pexels-photo-891125.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 792, alpha2: "tr", name: "Turkey", src:"https://images.pexels.com/photos/3684396/pexels-photo-3684396.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 795, alpha2: "tm", name: "Turkmenistan" },
  { id: 798, alpha2: "tv", name: "Tuvalu" },
  { id: 800, alpha2: "ug", name: "Uganda", src:"https://images.pexels.com/photos/5003198/pexels-photo-5003198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 804, alpha2: "ua", name: "Ukraine", src:"https://images.pexels.com/photos/6143369/pexels-photo-6143369.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 784, alpha2: "ae", name: "United Arab Emirates", src:"https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {
    id: 826,
    alpha2: "gb",
    name: "United Kingdom",
    src:"https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
  },
  { id: 840, alpha2: "us", name: "United States of America",src:"https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { id: 858, alpha2: "uy", name: "Uruguay", src:"https://images.pexels.com/photos/5173259/pexels-photo-5173259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 860, alpha2: "uz", name: "Uzbekistan" },
  { id: 548, alpha2: "vu", name: "Vanuatu" },
  {
    id: 862,
    alpha2: "ve",
    name: "Venezuela"
  },
  { id: 704, alpha2: "vn", name: "Viet Nam", src:"https://images.pexels.com/photos/5932468/pexels-photo-5932468.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 887, alpha2: "ye", name: "Yemen" },
  { id: 894, alpha2: "zm", name: "Zambia", src:"https://images.pexels.com/photos/1109898/pexels-photo-1109898.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  { id: 716, alpha2: "zw", name: "Zimbabwe", src:"https://images.pexels.com/photos/3378996/pexels-photo-3378996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
];
