
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import routes, db

db.Base.metadata.create_all(bind=db.engine)

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(routes.router)
