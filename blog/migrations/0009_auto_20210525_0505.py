# Generated by Django 3.1.8 on 2021-05-25 05:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0008_blogpagination'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='blogpagination',
            options={'verbose_name': 'ブログページネーション', 'verbose_name_plural': 'ブログページネーション'},
        ),
        migrations.AddField(
            model_name='blogpagination',
            name='featured',
            field=models.IntegerField(default=5, verbose_name='トップページおすすめ'),
        ),
        migrations.AlterField(
            model_name='blogpagination',
            name='category_page',
            field=models.IntegerField(default=5, verbose_name='カテゴリーページ'),
        ),
        migrations.AlterField(
            model_name='blogpagination',
            name='listing_page',
            field=models.IntegerField(default=5, verbose_name='ブログ投稿一覧'),
        ),
        migrations.AlterField(
            model_name='blogpagination',
            name='tag_page',
            field=models.IntegerField(default=5, verbose_name='タグページ'),
        ),
    ]
