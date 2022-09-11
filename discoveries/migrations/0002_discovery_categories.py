# Generated by Django 4.1.1 on 2022-09-11 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0001_initial'),
        ('discoveries', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='discovery',
            name='categories',
            field=models.ManyToManyField(related_name='discovery', to='categories.category'),
        ),
    ]