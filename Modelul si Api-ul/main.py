import torch
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = models.resnet18(pretrained=False)
num_ftrs = model.fc.in_features
model.fc = torch.nn.Linear(num_ftrs, 2)

model_path = "clasificator_de_fracturi.pth"
model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))

model.eval()

transformare = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

clase = ["Nu este fracturat", "Este fracturat"]

@app.post("/predict/")
async def predictie(fisier: UploadFile = File(...)):
    imagine_bytes = await fisier.read()
    imagine = Image.open(io.BytesIO(imagine_bytes)).convert("RGB")
    imagine = transformare(imagine).unsqueeze(0)

    with torch.no_grad():
        iesiri = model(imagine)
        _, prezis = torch.max(iesiri, 1)
        clasa_prezisa = clase[prezis.item()]
    
    return {"predictie": clasa_prezisa}
