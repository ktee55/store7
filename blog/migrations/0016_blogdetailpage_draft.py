# Generated by Django 4.1.9 on 2025-01-29 04:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0015_remove_blogdetailpage_draft'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogdetailpage',
            name='draft',
            field=models.BooleanField(default=False, verbose_name='下書きにする'),
        ),
    ]
