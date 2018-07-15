FROM python
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD . /code/
RUN pip install -i http://pypi.douban.com/simple/ --trusted-host=pypi.douban.com -r requirements.txt
