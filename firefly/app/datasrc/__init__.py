from flask import Blueprint

datasrc = Blueprint('datasrc', __name__)

from . import views, errors
