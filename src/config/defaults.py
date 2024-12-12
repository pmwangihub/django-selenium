import os
import environ
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
PARENT_DIR = BASE_DIR.parent
env = environ.Env()
