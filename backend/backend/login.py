from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

from secrets import compare_digest

security = HTTPBasic()


def get_user_id(credentials: HTTPBasicCredentials = Depends(security)):
    # TODO: Have actual users
    users = [("kisukauppa", "passu")]

    for (index, (user, password)) in enumerate(users):
        correct_username = compare_digest(credentials.username, user)
        correct_password = compare_digest(credentials.password, password)

        if correct_username and correct_password:
            return index

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password",
        headers={"WWW-Authenticate": "Basic"},
    )
