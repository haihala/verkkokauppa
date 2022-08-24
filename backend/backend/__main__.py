# This file is for running various commands.
from sys import argv

if argv[1] == "populate":
    from database.populate import populate
    from database import get_db
    populate(next(get_db()))
