# Verkkokauppa

Yksinkertainen webdev osaamisdemo.

## Frontend
Frontissa mentiin tutulla ja turvallisella react+typescript combolla. Tyylittelyyn käytettiin tailwindcss, modular css ja material ui.

Käynnistyy:
```sh
cd frontend
yarn install
yarn start
```

## Backend
Backendissä aloitettiin levittämällä rustin ilosanomaa Rocket frameworkin avulla, mutta jotta saa yhdellä kivellä kaksi lintua, vaihdettiin python fastapiin.

Käynnistyy (linuxilla):
```sh
cd backend
python -m venv venv
venv/bin/python -m pip install -r requirements.txt
venv/bin/python backend populate
venv/bin/uvicorn backend:app --reload
```

Windows rakentaa venv erilailla, joten:
```powershell
cd backend
python -m venv venv
.\venv\Scripts\python.exe -m pip install -r .\requirements.txt
.\venv\Scripts\python.exe backend populate
.\venv\Scripts\uvicorn.exe backend:app --reload
```

Riippuen miten python on asennettu, windows python haluaa ehkä tulla kutsutuksi nimellä `py`, jolloin toinen rivi muuttuu.

# PVL opiskelijat

Tehtäviä löytää [täältä](tasks.md)
