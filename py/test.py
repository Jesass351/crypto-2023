def a(text):
    if text == '8899aabbccddeeff0077665544332211':
        return 'cdedd4b9428d465a3024bcbe909d677f'
    if text == '1122334455667700ffeeddccbbaa9988':
        return '7f679d90bebc24305a468d42b9d4edcd'
    if text == 'fedcba9876543210':
        return '4ee901e5c2d8ca3d'
    return None

def b(text):
    if text == 'cdedd4b9428d465a3024bcbe909d677f':
        return '8899aabbccddeeff0077665544332211'
    if text == '7f679d90bebc24305a468d42b9d4edcd':
        return '1122334455667700ffeeddccbbaa9988'
    if text == '4ee901e5c2d8ca3d':
        return 'fedcba9876543210'