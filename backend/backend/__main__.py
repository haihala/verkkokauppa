# This file is for running various commands.
from sys import argv

if argv[1] == "populate":
    from database import Base, engine, populate, get_db
    Base.metadata.create_all(bind=engine)
    populate.populate(next(get_db()))
