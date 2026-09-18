import json
from json.decoder import JSONDecodeError

from ..core.logginig import get_logger

logger = get_logger(__name__)


def parse_optimized_queries(result: str) -> list[str]:
    try:
        # removing white spaces
        cleaned_result = result.strip()

        if cleaned_result.startswith("```"):
            # break into list of line's
            lines = cleaned_result.splitlines()
            # join them as str into next line
            cleaned_result = "\n".join(lines[1:-1]).strip()

            if cleaned_result.startswith("json"):
                cleaned_result = cleaned_result[4:].lstrip()

        if cleaned_result.startswith("queries ="):
            cleaned_result = cleaned_result.partition("=")[2].strip()

        data = json.loads(cleaned_result)
        # check if parsed data is in list format or not
        queries = data if isinstance(data, list) else data["queries"]

        if not isinstance(queries, list) or not all(
            isinstance(query, str) and query.strip() for query in queries
        ):
            raise ValueError("Query optimizer response must contain a list of strings")

        return queries

    except JSONDecodeError:
        logger.exception("json decoder error wrong format to decode")
