# Verkkokauppa

Yksinkertainen webdev osaamisdemo. Kisukauppa, mistä voi adoptoida kissoja ja ostaa niille tarvikkeita.

## Frontend
React SPA

Käynnistyy:
```sh
cd frontend
yarn install
yarn start
```

## Backend
Python + FastAPI backend

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
