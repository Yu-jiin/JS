import requests
from bs4 import BeautifulSoup



from selenium import webdriver
import time

# 크롬 드라이버 설정
# driver = webdriver.Chrome('./chromedriver')  # 크롬 드라이버 경로 설정
driver = webdriver.Chrome('C:/Users/SSAFY/Desktop/JS/JS/pjt준비/chromedriver.exe')

driver.get("http://www.cgv.co.kr/theaters/")

# 페이지가 로딩될 시간을 기다림
time.sleep(3)

# HTML 소스 가져오기
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

# 극장 코드 추출
theaters = soup.select('div.sect-city a')
theater_codes = {}

for theater in theaters:
    name = theater.text.strip()
    link = theater['href']
    code = link.split('theatercode=')[-1]
    theater_codes[name] = code

print(theater_codes)

# CGV 극장 목록 페이지 URL
url = "http://www.cgv.co.kr/theaters/"

def get_theater_codes():
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 극장 링크와 코드 추출
    theaters = soup.select('div.sect-city a')
    theater_codes = {}
    
    for theater in theaters:
        name = theater.text.strip()
        link = theater['href']
        code = link.split('theatercode=')[-1]  # 극장 코드 추출
        theater_codes[name] = code

    return theater_codes

print(get_theater_codes())
driver.quit()