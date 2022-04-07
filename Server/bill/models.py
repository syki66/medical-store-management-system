from django.db import models
from user import models as USER
from medicine import models as MEDICINE

# Create your models here.
class Bill(models.Model):
    bill_uid = models.AutoField(primary_key=True)
    user_uid = models.ForeignKey(USER.User, on_delete=models.CASCADE,db_column='user_uid')
    bill_customer_name = models.CharField(max_length=15)
    bill_address = models.CharField(max_length=50)
    bill_phone = models.CharField(max_length=15)
    bill_id = models.CharField(max_length=20)
    bill_total_sell = models.PositiveIntegerField()
    bill_profit = models.PositiveIntegerField()
    bill_date = models.DateTimeField()

class Bill_detail(models.Model):
    detail_uid = models.AutoField(primary_key=True)
    bill_uid = models.ForeignKey(Bill, on_delete=models.CASCADE, db_column='bill_uid')
    med_uid = models.ForeignKey(MEDICINE.Medicine, on_delete=models.CASCADE, db_column='med_uid')

    detail_sr_no = models.CharField(max_length=30)
    detail_med_name = models.CharField(max_length=20)
    detail_qty = models.PositiveIntegerField()
    detail_qty_type = models.CharField(max_length=20)
    detail_unit_price = models.PositiveIntegerField()
    detail_amount = models.PositiveIntegerField()
