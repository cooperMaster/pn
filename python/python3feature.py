__author__ = 'admin'
# -*- encoding: ut8 -*-

# f-strings(3.6+)
user = "Jane Doe"
action = "buy"
log_message = 'User {} has logged in and did an action {}.'.format(
  user,
  action
)
print(log_message)
# User Jane Doe has logged in and did an action buy.

log_message = f'User {user} has logged in and did an action {action}.'
print(log_message)
# User Jane Doe has logged in and did an action buy.

# Pathlib (3.4+)
from pathlib import Path
root = Path('pn')
print(root)
# post_sub_folder
path = root / 'python'
# Make the path absolute
print(path.resolve())

# Type hinting (3.5+)
def sentence_has_animal(sentence: str) -> bool:
  return "animal" in sentence

print(sentence_has_animal("Donald had a farm without animals"))
# True

# Enumerations (3.4+)
from enum import Enum, auto

class Monster(Enum):
    ZOMBIE = auto()
    WARRIOR = auto()
    BEAR = auto()
print(Monster.ZOMBIE)
# Monster.ZOMBIE

#https://datawhatnow.com/things-you-are-probably-not-using-in-python-3-but-should/