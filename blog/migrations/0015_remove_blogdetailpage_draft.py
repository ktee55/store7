# Generated by Django 4.1.9 on 2025-01-29 04:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0014_blogdetailpage_draft'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogdetailpage',
            name='draft',
        ),
    ]
