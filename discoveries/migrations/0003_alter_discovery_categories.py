# Generated by Django 4.1.1 on 2022-09-11 15:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0001_initial'),
        ('discoveries', '0002_discovery_categories'),
    ]

    operations = [
        migrations.AlterField(
            model_name='discovery',
            name='categories',
            field=models.ManyToManyField(related_name='discoveries', to='categories.category'),
        ),
    ]
