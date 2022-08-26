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
venv/bin/activate
pip install -r requirements.txt
python backend populate
uvicorn backend:app --reload
```

Windows rakentaa venv erilailla, joten:
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate.bat
pip install -r requirements.txt
python backend populate
uvicorn backend:app --reload
```

Riippuen miten python on asennettu, windows python haluaa ehkä tulla kutsutuksi nimellä `py`, jolloin toinen rivi muuttuu.

# PVL opiskelijat
- Yarn asentuu: `npm install --global yarn`
- Kun lopettaa niin aja `deactivate`
- Tehtäviä löytää [täältä](tasks.md)
