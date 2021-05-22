# Generated by Django 3.1.8 on 2021-05-22 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_auto_20210521_1207'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogPagination',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('listing_page', models.IntegerField(default=5)),
                ('category_page', models.IntegerField(default=5)),
                ('tag_page', models.IntegerField(default=5)),
            ],
            options={
                'verbose_name': 'Blog Pagination',
                'verbose_name_plural': 'Blog Paginations',
            },
        ),
    ]
