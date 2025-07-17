import HeaderTitle from '@/Components/HeaderTitle';
import IconArrowLeft from '@/Components/icons/IconArrowLeft';
import IconBooks from '@/Components/icons/IconBooks';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';

import { useRef } from 'react';
import { toast } from 'sonner';

export default function Create(props) {
  const fileInputCoverRef = useRef(null);
  const { data, setData, reset, post, processing, errors } = useForm({
    title: '',
    author: '',
    publication_year: null,
    isbn: '',
    language: null,
    synopsis: '',
    number_of_pages: '',
    cover: null,
    price: 0,
    category_id: null,
    publisher_id: null,
    total: 0,
    _method: props.page_settings.method,
  });

  const onHandleChange = (e) => setData(e.target.name, e.target.value);
  const onHandleReset = () => {
    reset();
    fileInputCoverRef.current.value = null;
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    post(props.page_settings.action, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (success) => {
        const flash = flashMessage(success);
        if (flash) toast[flash.type](flash.message);
      },
    });
  };

  return (
    <div className="flex w-full flex-col pb-32">
      <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <HeaderTitle title={props.page_settings.title} subtitle={props.page_settings.subtitle} icon={IconBooks} />
        <Button variant="orange" size="lg" asChild>
          <Link href={route('admin.books.index')}>
            <IconArrowLeft className={'size-4'} /> Kembali
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={onHandleSubmit} className="space-y-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title">Judul</Label>
              <Input
                name="title"
                id="title"
                type="text"
                placeholder="Masukkan judul..."
                value={data.title}
                onChange={onHandleChange}
              />
              {errors.title && <InputError message={errors.title} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="author">Penulis</Label>
              <Input
                name="author"
                id="author"
                type="text"
                placeholder="Masukkan nama penulis..."
                value={data.author}
                onChange={onHandleChange}
              />
              {errors.author && <InputError message={errors.author} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="publication_year">Tahun Terbit</Label>
              <Select
                defaultValue={data.publication_year}
                onValueChange={(value) => setData('publication_year', value)}
              >
                <SelectTrigger>
                  <SelectValue>
                    {props.page_data.publication_years.find(
                      (publication_year) => publication_year.toString() === data.publication_year,
                    ) ?? 'Pilih tahun terbit'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {props.page_data.publication_years.map((publication_year, index) => (
                    <SelectItem key={index} value={publication_year}>
                      {publication_year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="isbn">ISBN (International Standard Book Number)</Label>
              <Input
                name="isbn"
                id="isbn"
                type="text"
                placeholder="Masukkan ISBN..."
                value={data.isbn}
                onChange={onHandleChange}
              />
              {errors.isbn && <InputError message={errors.isbn} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="language">Bahasa</Label>
              <Select defaultValue={data.language} onValueChange={(value) => setData('language', value)}>
                <SelectTrigger>
                  <SelectValue>
                    {props.page_data.languages.find((language) => language.value === data.language)?.label ??
                      'Pilih bahasa'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {props.page_data.languages.map((language, index) => (
                    <SelectItem key={index} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.language && <InputError message={errors.language} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="synopsis">Sinopsis</Label>
              <Textarea
                name="synopsis"
                id="synopsis"
                onChange={onHandleChange}
                placeholder="Masukkan sinopsis..."
                value={data.synopsis}
              ></Textarea>

              {errors.synopsis && <InputError message={errors.synopsis} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="number_of_pages">Jumlah halaman</Label>
              <Input
                name="number_of_pages"
                id="number_of_pages"
                type="number"
                min="0"
                placeholder="Masukkan Jumlah Halaman..."
                value={data.number_of_pages}
                onChange={onHandleChange}
              />
              {errors.number_of_pages && <InputError message={errors.number_of_pages} />}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="cover">Cover</Label>
              <Input
                name="cover"
                id="cover"
                type="file"
                onChange={(e) => setData(e.target.name, e.target.files[0])}
                ref={fileInputCoverRef}
              />
              {errors.cover && <InputError message={errors.cover} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="price">Harga</Label>
              <Input
                name="price"
                id="price"
                min="0"
                type="number"
                placeholder="Masukkan harga..."
                value={data.price}
                onChange={onHandleChange}
              />
              {errors.price && <InputError message={errors.price} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="category_id">Kategori</Label>
              <Select defaultValue={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                <SelectTrigger>
                  <SelectValue>
                    {props.page_data.categories.find((category) => category.value.toString() === data.category_id)
                      ?.label ?? 'Pilih Kategori'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {props.page_data.categories.map((category, index) => (
                    <SelectItem key={index} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category_id && <InputError message={errors.category_id} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="publisher_id">Penerbit</Label>
              <Select defaultValue={data.publisher_id} onValueChange={(value) => setData('publisher_id', value)}>
                <SelectTrigger>
                  <SelectValue>
                    {props.page_data.publishers.find((publisher) => publisher.value.toString() === data.publisher_id)
                      ?.label ?? 'Pilih penerbit'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {props.page_data.publishers.map((publisher, index) => (
                    <SelectItem key={index} value={publisher.value}>
                      {publisher.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.publisher_id && <InputError message={errors.publisher_id} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="total">Stok</Label>
              <Input
                name="total"
                id="total"
                type="number"
                min="0"
                placeholder="Masukkan total stok..."
                value={data.total}
                onChange={onHandleChange}
              />
              {errors.total && <InputError message={errors.total} />}
            </div>
            <div className="flex justify-end gap-x-2">
              <Button type="button" variant="ghost" size="lg" onClick={onHandleReset}>
                Reset
              </Button>
              <Button type="submit" variant="orange" size="lg" disabled={processing}>
                Simpan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
