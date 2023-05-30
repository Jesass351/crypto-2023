mag = __import__('MAGMA')
kuz = __import__('34_12-KUZ')

def magma():
    text = input("Введите сообщение: ")
    key = input("Введите ключ: ")

    textEncrypt = mag.encrypt(text, key)
    print('Зашифрование: ', textEncrypt)

    textDecrypt = mag.decrypt(textEncrypt, key)
    print('Расшифрование: ', textDecrypt)

def kuznechick():
    text = input("Введите сообщение: ")
    key = input("Введите ключ: ")
    K = kuz.getKeys(key)  # Получение ключей для шифрования и расшифрования
    
    
    textEncrypt = kuz.encrypt(text, K)
    print("Зашифрование: ", textEncrypt)
    
    textDecrypt = kuz.decrypt(textEncrypt, K)
    print('Расшифрование: ', textDecrypt)

print("Выберите шифр:\nМагма: 0\nКузнечик: 1\n")
choose = int(input())
if (choose == 0):
    magma()
elif (choose == 1):
    kuznechick()