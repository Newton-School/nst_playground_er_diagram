from fastapi import FastAPI


app = FastAPI()

@app.get('/health')
def health():
    return {"okay": True}

@app.get('/questions')
def questions_list():
    return store.list_questions()

@app.post('/questions')
def questions_create(payload: dict = Body(...)):
    title = payload.get('title')
    prompt = payload.get('prompt')
    reference = payload.get('reference')
    if not title or not prompt or reference is None:
        raise HTTPException(422, 'body must contain "title", "prompt" and "reference"')
    return {'id': store.create_question(title, prompt, reference)}


@app.get('/questions/{qid}')
def questions_get(qid: int, include_reference: bool = False):
    q = store.get_question(qid)
    if q is None:
        raise HTTPException(404, f'no question with id {qid}')
    if not include_reference:
        del q['reference']
    return q

@app.delete('/questions/{qid}')
def questions_delete(qid: int):
    if not store.delete_question(qid):
        raise HTTPException(404, f'no question with id {qid}')
    return {'ok': True}

