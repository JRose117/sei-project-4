# Generated by Django 4.1.1 on 2022-09-12 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0001_initial'),
        ('discoveries', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='discovery',
            name='tags',
            field=models.ManyToManyField(blank=True, default=[], related_name='discoveries', to='tags.tag'),
        ),
    ]