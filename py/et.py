# et.py>
#UTF-8 in console: chcp 65001
#спец знаки в кодировке под номерами от 'я'+1 до 'я'+6 
#в алфавите 70 символов
# ' ' == 'ѐ'
# ',' == 'ё'
# '.' == 'ђ'
# '-' == 'ѓ'
# ':' == 'є'
# ';' == 'ѕ'

def edit1(text):                                                                   #перевод спецсимволов в алфавит
    text=text.replace(' ', chr(ord('я')+1)).replace(',', chr(ord('я')+2))
    text=text.replace('.', chr(ord('я')+3)).replace('-', chr(ord('я')+4))
    text=text.replace(':', chr(ord('я')+5)).replace(';', chr(ord('я')+6))
    return(text)

def edit2(text, B='N'):                                                             #перевод спец символов для чтения
    text=text.replace(chr(ord('я')+1), ' ').replace(chr(ord('я')+2), ',')
    text=text.replace(chr(ord('я')+3), '.').replace(chr(ord('я')+4), '-')
    text=text.replace(chr(ord('я')+5), ':').replace(chr(ord('я')+6), ';')
    if B=='Y':                                                                      #проверка нужно или нет выводить сообщение
        print()
        print(text)
    else:
        return(text)

def edit0():                                                                        #начальное ворматирование сообщения
    cr=input('Если вы хотите зашифровать введите - 1, если расшифровать - 2: ')     #вопрос что делать шифровать/расшифровывать
    text=input('Введите сообщение: ')                                               #запрос сообщения
    text=edit1(text)
    return(cr, text)

def prime_num(num): # проверка на простоту
    k = 0
    check = 1
    while check!=0:
        for i in range(2, num // 2+1):
            if (num % i == 0):
                k = k+1
        if (k <= 0):
            # print("Число простое")
            check = 0
        elif(check!=0):
            print("Число не является простым")
            num = int(input('Введите значение параметра P(простое число): '))
            k = 0
    return num

def hesch(t, p):
    h0=0
    for s in t:
        h1=((h0+ord(s)-ord('А')+1)**2)%p
        h0=h1
        # print(h1)
    return h1

def is_coprime(e, f): # проверка на взаимную простоту
    check = 1
    while check!=0:
        if(math.gcd(e, f) == 1):
            check = 0
            # print('Числа ', e, 'и', f, ' взаимно простые')
        else:
            print('Числа ', e, 'и', f, ' НЕ взаимно простые')
            e = int(input('Введите новое значение параметра Е: '))
    return (e)