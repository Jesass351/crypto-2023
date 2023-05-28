import transformations as tr

X = tr.xor_func # операция XOR
S = tr.nonlinear_transformation # нелинейное преобразование в режиме простой замены
L = tr.linear_transformation # линейное преобразование
C = [] # константы
F = [] # ячейки Фейстеля

print("S", S("ffeeddccbbaa99881122334455667700"))
print("L", L("0e93691a0cfc60408b7b68f66b513c13"))

key = '7766554433221100FFEEDDCCBBAA9988EFCDAB89674523011032547698BADCFE'
#key = '8899AABBCCDDEEFF0011223344556677FEDCBA98765432100123456789ABCDEF'
# key = '448CC78CEF6A8D2243436915534831DB04FD9F0AC4ADEB1568ECCFE9D853453D'
K = [key[:int(len(key) / 2)], key[int(len(key) / 2) :]]

for i in range(32):
    if len(hex(i + 1)[2:]) == 1:
        C.append(L('0' + hex(i + 1)[2:] + '000000000000000000000000000000').upper())
    else:
        C.append(L(hex(i + 1)[2:] + '000000000000000000000000000000').upper())
        
for i in range(len(C)):
    print("C"+str(i+1), C[i])

# формирование ячеек Фейстеля
F.append([ K[1], X(L(S(X( K[0], C[0]))),  K[1])])
for i in range(32):
    K = [ F[i][1], X(L(S(X( F[i][0], C[i]))),  F[i][1])]
    F.append(K)
    
for i in range(len(F)):
    print("F" + str(i+1), F[i])

# разбиение заданного ключа пополам
K = [key[:int(len(key) / 2)], key[int(len(key) / 2) :]]

# формирование новых ключей из ячеек Фейстеля
for i in range(len(F)):
    if (i + 1) % 8 == 0:
        K.append(F[i][0])
        K.append(F[i][1])

# вывод новых ключей для шифрования


# заданные ключи
K = [
'7766554433221100FFEEDDCCBBAA9988',
'EFCDAB89674523011032547698BADCFE',
'448CC78CEF6A8D2243436915534831DB',
'04FD9F0AC4ADEB1568ECCFE9D853453D',
'ACF129F44692E5D3285E4AC468646457',
'1B58DA3428E832B532645C16359407BD',
'B198005A26275770DE45877E7540E651',
'84F98622A2912AD73EDD9F7B0125795A',
'17E5B6CD732FF3A52331C77853E244BB',
'43404A8EA8BA5D755BF4BC1674DDE972'
]

for i in range(len(K)):
    print(i + 1, K[i])

# текст, который необходимо зашифровать
text = '8899AABBCCDDEEFF0077665544332211'
print('Исходный текст:       ', text)

# шифрование текста
textEncrypted = text
for i in range(9):
    textEncrypted = L(S(X(textEncrypted, K[i])))
    print(i+1,textEncrypted)
textEncrypted = X(textEncrypted, K[9])
print(K[9], textEncrypted)
print('Зашифрованный текст:  ', textEncrypted)

# расшифрование текста
textDecrypted = textEncrypted
for i in range(9, 0, -1):
    textDecrypted = S(L(X(textDecrypted, K[i]), 'reverse'), 'reverse')
textDecrypted = X(textDecrypted, K[0])
print('Расшифрованный текст: ', textDecrypted)
