import eel
import requests
import json
import pandas as pd
import datetime

def main():

    eel.init('./website/dist/')
    eel.start('index.html', port=0, size=(800, 600))

    today = datetime.date.today()
    print(today)

    pass


@eel.expose
def get_klines():

    result = []
    endPoint = 'https://api.coin.z.com/public'

    today = datetime.date.today()
    # print(f'{str(today.year).zfill(4)}{str(today.month).zfill(2)}{str(today.day).zfill(2)}')

    date = datetime.date(2023, 1, 1)

    while int(f'{str(date.year).zfill(4)}{str(date.month).zfill(2)}{str(date.day).zfill(2)}') <= int(f'{str(today.year).zfill(4)}{str(today.month).zfill(2)}{str(today.day).zfill(2)}'):

        response = requests.get(f'{endPoint}/v1/klines?symbol=BTC&interval=1hour&date={str(date.year).zfill(4)}{str(date.month).zfill(2)}{str(date.day).zfill(2)}')
        # print(json.dumps(response.json(), indent=2))

        klines = json.loads(response.text) 
        df = pd.DataFrame(klines['data'])
        # print(df)

        for index, row in df.iterrows():
            result_row = [int(row['openTime']),int(row['open']),int(row['high']),int(row['low']),int(row['close']),float(row['volume']),]
            result.append(result_row)
            pass

        date = date + datetime.timedelta(days=1)
        pass



    # print(result)
    return result


if __name__ == '__main__':
    try:
        main()
    except Exception:
        pass
