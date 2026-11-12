from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
font=root/'design/phase-2/assets/space-grotesk-medium.ttf'
small=ImageFont.truetype(str(font),26)
large=ImageFont.truetype(str(font),64)
labels={'home':['Complete digital','products.'],'work':['Selected work.'],'work-backupdata':['BackupData.'],'work-lighthouse':['Lighthouse.'],'work-1mb':['1MB.'],'work-turby':['Turby.'],'ai-systems':['Applied AI.'],'journey':['The career','record.'],'about':['Design and','engineering.'],'contact':['Start a','conversation.']}
folder=root/'public/social';folder.mkdir(parents=True,exist_ok=True)
poster=Image.open(root/'design/phase-13/exports/selected-scene-poster.webp').convert('RGB')
poster.thumbnail((520,450),Image.Resampling.LANCZOS)
for slug,lines in labels.items():
 image=Image.new('RGB',(1200,630),'#101216');draw=ImageDraw.Draw(image)
 image.paste(poster,(680,120))
 draw.text((64,54),'Arpit Bindal',font=small,fill='#f1f3f6')
 draw.line((64,120,1136,120),fill='#303640',width=1)
 for i,line in enumerate(lines):draw.text((64,218+i*76),line,font=large,fill='#f1f3f6')
 draw.line((64,500,184,500),fill='#e75b7f',width=4)
 draw.text((64,540),'arpitbindal.com',font=small,fill='#afb6c2')
 image.save(folder/(slug+'.png'),optimize=True)
(folder/'provenance.json').write_text(json.dumps({'source':'design/phase-13/exports/selected-scene-poster.webp','method':'Local composition with licensed Space Grotesk font','dimensions':[1200,630],'credits':0,'files':[s+'.png' for s in labels]},indent=2)+'\n')
