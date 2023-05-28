import binascii
from gost import *


if __name__ == '__main__':
    mtest = list(binascii.unhexlify('8899aabbccddeeff0077665544332211'))
    print(mtest)
    ktest = list(binascii.unhexlify('7766554433221100ffeeddccbbaa9988efcdab89674523011032547698badcfe'))
    gost =gost2015(ktest)
    print('GOST 34.12-2015')
    c = gost.encryption(mtest)
    print("шифровка",c)
    print(list(binascii.unhexlify('cdedd4bb948d465a3024bcbe909d677f')))
    d = gost.decryption(c)
    print(d)