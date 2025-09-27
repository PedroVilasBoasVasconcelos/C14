import pytest
import mongomock

from app.modeles.poke_model import Name, BaseStats, Pokemon
from app.repositories.poke_repositore import PokemonRepository
from app.services.poke_service import PokeService


# Mock do banco
@pytest.fixture
def mock_repo(monkeypatch):
    mock_client = mongomock.MongoClient()
    mock_db = mock_client['pokemon']
    collection = mock_db['pokedex']
    
    # Função mockada para substituir o get_database
    def mock_get_database():
        return mock_db
    
    monkeypatch.setattr("app.config.dbconfig.get_database", mock_get_database)
    return PokemonRepository()

@pytest.fixture
def service(mock_repo):
    return PokeService()

# Dados de teste
def sample_pokemon():
    return Pokemon(
        id=1,
        name=Name(english="Bulbasaur", japanese="フシギダネ", chinese="妙蛙种子", french="Bulbizarre"),
        type=["Grass", "Poison"],
        base=BaseStats(HP=45, Attack=49, Defense=49, Sp_Attack=65, Sp_Defense=65, Speed=45)
    )

# ===================
# Testes Positivos
# ===================

def test_create_pokemon(service):
    p = sample_pokemon()
    result = service.create_pokemon(p)
    assert result is not None

def test_get_pokemon_by_id(service):
    p = sample_pokemon()
    service.create_pokemon(p)
    pokemon = service.get_pokemon_by_id(1)
    assert pokemon['name']['english'] == "Bulbasaur"

def test_get_pokemon_by_name(service):
    p = sample_pokemon()
    service.create_pokemon(p)
    pokemon = service.get_pokemon_by_name("Bulbasaur")
    assert pokemon['id'] == 1

def test_get_all_pokemons_by_type(service):
    p = sample_pokemon()
    service.create_pokemon(p)
    pokemons = service.get_all_pokemons_by_type("Grass")
    assert len(pokemons) == 1

def test_update_pokemon(service):
    p = sample_pokemon()
    service.create_pokemon(p)
    p.name.english = "Ivysaur"
    result = service.update_pokemon(1, p)
    assert result == 1

def test_delete_pokemon(service):
    p = sample_pokemon()
    service.create_pokemon(p)
    result = service.delete_pokemon(1)
    assert result == 1

# ===================
# Testes Negativos
# ===================

import pytest
from fastapi import HTTPException

def test_get_pokemon_by_id_not_found(service):
    with pytest.raises(HTTPException):
        service.get_pokemon_by_id(999)

def test_get_pokemon_by_name_not_found(service):
    with pytest.raises(HTTPException):
        service.get_pokemon_by_name("Missingno")

def test_get_all_pokemons_by_type_empty(service):
    pokemons = service.get_all_pokemons_by_type("Fire")
    assert pokemons == []

def test_update_nonexistent_pokemon(service):
    p = sample_pokemon()
    with pytest.raises(HTTPException):
        service.update_pokemon(999, p)

def test_delete_nonexistent_pokemon(service):
    with pytest.raises(HTTPException):
        service.delete_pokemon(999)

# Casos adicionais para completar 20 testes
def test_create_duplicate_pokemon(service):
    p = sample_pokemon()
    service.create_pokemon(p)
    with pytest.raises(HTTPException):
        service.create_pokemon(p)

def test_get_all_pokemons_pagination(service):
    p = sample_pokemon()
    service.create_pokemon(p)
    pokemons = service.get_all_pokemons_by_type("Grass", page=2, page_size=1)
    assert pokemons == []

def test_update_without_change(service):
    p = sample_pokemon()
    service.create_pokemon(p)
    result = service.update_pokemon(1, p)
    assert result == 0 or result == 1  # depende se o mongo considera modificação

def test_create_pokemon_invalid_data(service):
    from pydantic import ValidationError
    with pytest.raises(ValidationError):
        Pokemon(id=2, name={}, type=[], base={})

def test_service_jsoninfo_returns_dict(service):
    p = sample_pokemon()
    service.create_pokemon(p)
    data = service._repository.getById(1)
    result = service.jsoninfo(data)
    assert isinstance(result, dict)
