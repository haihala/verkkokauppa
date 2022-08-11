from typing import Any


def dict_to_model_list(dict_input: dict[str, dict[str, Any]]) -> list[dict]:
    return [value | {"id": str(key)} for key, value in dict_input.items()]
