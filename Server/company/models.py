from django.db import models
from bank import models as BANK
from user import models as USER
# Create your models here.

class Company(models.Model):
    com_uid = models.AutoField(primary_key=True)
    user_uid = models.ForeignKey(USER.User, on_delete=models.CASCADE, db_column='user_uid')
    bank_uid = models.ForeignKey(BANK.Bank, on_delete=models.CASCADE, db_column='bank_uid')

    com_name = models.CharField(max_length=20)
    com_licence_no = models.CharField(max_length=20)
    com_address = models.CharField(max_length=50)
    com_contact_no = models.CharField(max_length=15)
    com_email = models.EmailField()
    com_description = models.TextField()
    com_joindate = models.DateTimeField(auto_now_add=True)
    com_account_no = models.CharField(max_length=20)