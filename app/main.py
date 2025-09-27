from fastapi import FastAPI
from app.routes.poke_route import router as pokemon_router

app = FastAPI()

app.include_router(pokemon_router)

@app.get("/")
async def root():
    return {"message": "Seja bem-vindo à sua Pokedéx!"}