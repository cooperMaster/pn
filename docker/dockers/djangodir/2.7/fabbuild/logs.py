from logsparser.lognormalizer import LogNormalizer as LN
import os

normalizer_path = os.environ['NORMALIZERS_PATH']
normalizer = LN(normalizer_path)
access_log = open('E:/workspaces/pylogsparser/logs/access_log', 'r')

for log in access_log:
    l = {'body': log}
    lg = normalizer.normalize(l)
    print lg
