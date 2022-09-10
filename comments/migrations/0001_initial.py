# Generated by Django 4.1.1 on 2022-09-09 21:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('discoveries', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(max_length=280)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('discovery', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='discoveries.discovery')),
            ],
        ),
    ]