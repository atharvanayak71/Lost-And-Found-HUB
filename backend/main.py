from fastapi import FastAPI

app = FastAPI(title="Lost & Found Hub API")


@app.get("/")
def home():
    return {"message": "Lost & Found Hub API is running"}