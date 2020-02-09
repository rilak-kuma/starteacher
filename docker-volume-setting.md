※ 도커 볼륨설정 방법
※ mysql federated 설정을 위한 설정 단계 [1][2][3][4]
※ mysql /etc/mysql/my.cnf 파일을 수정 관리하기 위해 볼륨설정 단계를 처리한다.

[1] 도커 컨테이너를 기동한다.
##################
# @docker\dev.yml

# mysql
rdb:
    image: mysql:8.0.15
    command: ['--default-authentication-plugin=mysql_native_password']
    volumes:
        - '../../data/rdb:/var/lib/mysql:rw'
        ######- '../../data/rdb/etc/mysql/my.cnf:/etc/mysql/my.cnf:rw'
    environment:
        - 'MYSQL_DATABASE=starteacher'
        - 'MYSQL_USER=root'
        - 'MYSQL_PASSWORD=root'
        - 'MYSQL_ROOT_PASSWORD=root'
        - 'TZ=Asia/Seoul'
    ports:
        - '33061:3306'

[2] 컨테이너 파일(또는 디렉토리)를 카피한다.
# @docker console
# docker 컨테이너의 my.cnf를 로컬 volume으로 copy 한다.
docker container cp 24cdfcdf7228:/etc/mysql/my.cnf container.my.cnf

[3] copy된 파일을 수정하고 다시 컨테이너 파일로 카피한다.
# @docker console
# container.my.cnf를 수정한다. federated = 1 라인추가하여 수정한 파일을
# 다시 컨테이너 안으로 카피한다.
docker container cp container.my.cnf 24cdfcdf7228:/etc/mysql/my.cnf

[4] 볼륨설정을 추가해준다. 다시 컨테이너를 기동하여 설정된 작동상태를 확인한다.
##################
# @docker\dev.yml
# mysql
rdb:
    image: mysql:8.0.15
    command: ['--default-authentication-plugin=mysql_native_password']
    volumes:
        - '../../data/rdb:/var/lib/mysql:rw'
        - '../../data/rdb/etc/mysql/my.cnf:/etc/mysql/my.cnf:rw'
    environment:
        - 'MYSQL_DATABASE=starteacher'
        - 'MYSQL_USER=root'
        - 'MYSQL_PASSWORD=root'
        - 'MYSQL_ROOT_PASSWORD=root'
        - 'TZ=Asia/Seoul'
    ports:
        - '33061:3306'
