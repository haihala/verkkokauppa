# Työkalut
## Tietokanta
Jos tehtäviä tehdessä pitäisi ns aloittaa alusta tietokannan suhteen, poista `backend/db.sqlite3` -tiedosto ja aja `populate` komento uudestaan.

On työkaluja joilla pääsee katsomaan tietokannan sisään, itse käytin kehittäessä https://sqlitebrowser.org/dl/.

## VSCode
VSCodessa pitää ehkä kertoa mitä formatteria haluaa käyttää. Se tapahtuu näin:
- Avaa `.tsx` tiedosto
- Paina ctrl+shift+p (avaa komentopaletin)
- Hae ja valitse "Format document"
- Valitse joku formatter, tästä eteenpäin VSCode muistaa valinnan `.tsx` tiedostoille
  - Jos formattereita ei ole asennettuna, asenna "Prettier"
  - assarit ja Google osaa molemmat asentaa VSCode lisäreitä

Elämä helpottuu jos VSCode formatoi koodia aina kun tallennat tiedoston. Sen saa päälle näin:
- Avaa asetukset (joko ctrl+pilkku tai vasemmalta ylhäältä file>preferences>settings)
- Hae "format on save", varmista että ruudussa on rasti

## Swagger
FastAPI luo automaattisesti dokumentaation ja testaustyökalun backendille. Sen löytää osoitteesta http://127.0.0.1:8000/docs#/ kun backend on käynnissä.

Swaggerissä voi kokeilla eri endpointteja ja nähdä mitä ne palauttavat. Authentication kannattaa tehdä Swaggerin omalla jutulla sen sijaan että antais sille käyttäjän/salasanan kun se popuppaa requestia tehdessä. (lukko nappi joko oikealla ylhäälää tai relevantissa endpointissa)

# Tehtävät
Tee mikä tuntuu mielekkäältä. Etenkin frontissa on vaikea välillä sanoa koska joku on valmis, niin älä jää viilaamaan jotain äärettömän pitkään.

Omaa tuunaamista saa keksiä jos se on jotenkin asiaan liittyvää ja siinäkin autetaan. Alla on muutamia esimerkkitehtäviä.

# Helpot
## Tuunaa etusivu
Etusivu on aika tylsä. Tee siitä mielenkiintoisempi.

## Lisää toinen tuote
Kaupassa on tällä hetkellä vain kissanruokaa. Lisää populate scriptiin toinen tuote.

# Medium
## Paranna tietokannan turvallisuutta
Tällä hetkellä salasanat ovat tietokannasssa ihan selkeänä tekstinä.

## Lisää tuotteisiin määrä
Oikeassa kaupassa on rajallisesti tuotteita. Lisää tuotteisiin kenttä joka kuvaa montako niitä on jäljellä ja käsittele se tee jotain silloin jos käyttäjä tilaa jotain mitä ei enää ole jäljellä.

## Lisää kissoihin dataa
Tällä hetkellä kissat ovat aika minimalistisia, mutta voisi olla hyvä että niistä tiedetään enemmänkin kun nimi ja kuva.

Esimerkki kenttiä:
- Turkin väri
- Paino
- Ikä

Jos tekee [kissa modalin](#lisää-modal-kissoille), niin uudet kentät voi saada näkymään siinä.

## Lisää Modal kissoille
Kun kissan kuvaa klikataan, sen pitäisi avata modal josta näkee kissan lisätietoja. Modaleista on mallia login toiminnallisuudessa.

Tämä ei oikein ole mielekäs jos ei [lisää kissoihin dataa](#lisää-kissoihin-dataa)

## Vaihda teemaa
Käyttäen Material UI teematusjärjestelmää, vaihda sivun teemaa. Halutessasi voit jopa lisätä napin joka vaihtaa teemaa (night mode)

## Tee Cypress testi joka tarkistaa että kaikki toimii
Cypress on työkalu, mikä voi automaattisesti kliksutella nettisivua läpi ja varmistaa toimintaa.

## Backend laadunvalvontaa
Pythonille on työkaluja, joita voi käyttää parantamaan koodin laatua

Tekisin itse niin että lisäisin toisen tiedoston joka kertoo mitä niitä käytetään, vaikka `qa-requirements.txt` (qa = quality assurance = laadun varmistus). Lisäisin sit yksittäiset työkalut sinne ja asentaisin samalla tavalla kun nykyinen `requirements.txt` sisältö asentuu.

Tämä vaatii jonkun verran itsenäistä etsimistä että saa työkalut toimimaan, mutta assarit ja google auttavat.

### Pylint
Linter, valittaa tyylivirheistä.

### Mypy
Tarkistaa tyypityskämmäyksiä.

Voi olla ettei mypy tarkista funktioita joissa ei ole paluutyyppiä, jos tämä on tilanne ja funktio ei palauta mitään, lisää `-> None` paluutyypiksi.

### Pip-compile
Työkalu jolla saa lockfilejä vastaavan toiminnallisuuden pythoniin. Tämä ei ole läheskään yhtä pakollista kun JS kanssa, mutta silti hyödyllistä.

## Lisää backendille testejä
Koodatessa on yleistä kirjoittaa koodia testaamaan että muu koodi toimii oikein. Puhutaan yksikkötesteistä (unit tests).

Pytest on kirjasto, jolla voi kirjoittaa testejä pythonissa. FastAPI dokumentaatio kertoo miten esimerkiksi tietokannan kanssa tulisi toimia testatessa.

# Vaikeat
## Lisää sivu josta käyttäjä näkee omat kissansa ja tilauksensa
Uusi sivu pitäisi olla näkyvissä vain jos käyttäjä on kirjautunut sisään. Vaatii backendille endpointin josta voi kysyä käyttäjän tilaukset ja kissat ja fronttiin sivun missä ne näytetään.

## Context pohjainen front ratkaisu
Reactissa on context system, jolla voi jakaa dataa joskus aika elegantistikkin. Korvaa nykyiset custom hookit ainakin osittain context pohjaisella järjestelmällä.

# Mega hard
Älkää ottako näitä jos ei halua turhautua

## Alembic tjsp database migrations
Jos tietokanta muuttuu niin tuotannossa sitä ei voi vaan poistaa ja populoida uudestaan, koska siellä on oleellista dataa tallessa. Tätä varten on database migrations ja työkaluja kuten alembic, joilla voi koodata (tai automaattisesti generoida) "migraatioita". Migraatio on ohjelma mikä muuttaa tietokannan vanhasta muotista uuteen

## Authentication käyttäen jotain basic auth parempaa
Basic auth on sinänsä fine, mutta esim jonkinlainen tokenipohjainen järjestelmä lienee parempi. FastAPI dokumentaatio tarjoaa vaihtoehtoja.

Jos haluaa oikeasti harrastaa masokismia niin OAuth2.

## Dockerisoi backend ja vaihda tietokannaksi postgresql
Tietäjät tietää

taikasanoja:
- Docker
- docker-compose
- container
- image
