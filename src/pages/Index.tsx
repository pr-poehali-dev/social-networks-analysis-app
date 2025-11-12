import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

interface Mention {
  id: string;
  platform: string;
  author: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  engagement: number;
  timestamp: string;
  views: number;
}

const mockMentions: Mention[] = [
  {
    id: '1',
    platform: 'VK',
    author: 'Иван Соколов',
    content: 'Поддерживаю инициативу партии! Важно отстаивать интересы трудящихся.',
    sentiment: 'positive',
    engagement: 1243,
    timestamp: '2025-11-12 14:32',
    views: 12450
  },
  {
    id: '2',
    platform: 'VK',
    author: 'Мария Петрова',
    content: 'Не согласна с некоторыми решениями, нужен более взвешенный подход.',
    sentiment: 'negative',
    engagement: 567,
    timestamp: '2025-11-12 13:15',
    views: 8920
  },
  {
    id: '3',
    platform: 'VK',
    author: 'Александр К.',
    content: 'Интересная позиция по социальным вопросам.',
    sentiment: 'neutral',
    engagement: 234,
    timestamp: '2025-11-12 12:08',
    views: 5670
  },
  {
    id: '4',
    platform: 'VK',
    author: 'Сергей Михайлов',
    content: 'Хорошая работа с избирателями! Продолжайте в том же духе.',
    sentiment: 'positive',
    engagement: 892,
    timestamp: '2025-11-12 11:45',
    views: 15230
  },
  {
    id: '5',
    platform: 'VK',
    author: 'Анна Васильева',
    content: 'Посмотрим, что будет дальше.',
    sentiment: 'neutral',
    engagement: 445,
    timestamp: '2025-11-12 10:22',
    views: 7890
  }
];

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSentiment, setFilterSentiment] = useState('all');

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500';
      case 'negative':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getSentimentText = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'Позитивная';
      case 'negative':
        return 'Негативная';
      default:
        return 'Нейтральная';
    }
  };

  const filteredMentions = mockMentions.filter((mention) => {
    const matchesSearch =
      searchTerm === '' ||
      mention.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mention.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSentiment = filterSentiment === 'all' || mention.sentiment === filterSentiment;
    return matchesSearch && matchesSentiment;
  });

  const totalMentions = 12847;
  const positiveRate = 62;
  const negativeRate = 18;
  const neutralRate = 20;
  const avgEngagement = 4238;

  const weeklyActivity = [
    { day: 'Пн', posts: 45, maxPosts: 78 },
    { day: 'Вт', posts: 52, maxPosts: 78 },
    { day: 'Ср', posts: 78, maxPosts: 78 },
    { day: 'Чт', posts: 63, maxPosts: 78 },
    { day: 'Пт', posts: 71, maxPosts: 78 },
    { day: 'Сб', posts: 38, maxPosts: 78 },
    { day: 'Вс', posts: 29, maxPosts: 78 }
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Мониторинг упоминаний</h1>
            <p className="text-muted-foreground">Социально-политическая аналитика брендов</p>
            <div className="flex items-center gap-2 mt-3">
              <Icon name="ExternalLink" className="h-4 w-4 text-muted-foreground" />
              <a 
                href="https://vk.com/kprfkomi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                vk.com/kprfkomi
              </a>
              <Badge variant="outline" className="ml-2">Активный источник</Badge>
            </div>
          </div>
          <Button>
            <Icon name="Download" className="mr-2 h-4 w-4" />
            Экспорт
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Всего упоминаний</CardTitle>
              <Icon name="MessageSquare" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMentions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">↑ 12.5%</span> за последнюю неделю
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Позитивные</CardTitle>
              <Icon name="ThumbsUp" className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{positiveRate}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${positiveRate}%` }}></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Негативные</CardTitle>
              <Icon name="ThumbsDown" className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{negativeRate}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${negativeRate}%` }}></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Средний охват</CardTitle>
              <Icon name="Users" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgEngagement.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">вовлечений на пост</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Тональность упоминаний</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Позитивные ({positiveRate}%)</span>
                  <span className="text-sm text-muted-foreground">{Math.round(totalMentions * positiveRate / 100).toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: `${positiveRate}%` }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Нейтральные ({neutralRate}%)</span>
                  <span className="text-sm text-muted-foreground">{Math.round(totalMentions * neutralRate / 100).toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gray-400 h-3 rounded-full" style={{ width: `${neutralRate}%` }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Негативные ({negativeRate}%)</span>
                  <span className="text-sm text-muted-foreground">{Math.round(totalMentions * negativeRate / 100).toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-red-500 h-3 rounded-full" style={{ width: `${negativeRate}%` }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Активность по дням недели</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyActivity.map((item) => (
                  <div key={item.day} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium w-8">{item.day}</span>
                      <span className="text-sm text-muted-foreground">{item.posts} публикаций</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(item.posts / item.maxPosts) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-xl">Последние упоминания</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Поиск..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64"
                />
                <Select value={filterSentiment} onValueChange={setFilterSentiment}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Тональность" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                    <SelectItem value="positive">Позитивные</SelectItem>
                    <SelectItem value="neutral">Нейтральные</SelectItem>
                    <SelectItem value="negative">Негативные</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Автор</TableHead>
                  <TableHead className="max-w-md">Содержание</TableHead>
                  <TableHead>Тональность</TableHead>
                  <TableHead>Просмотры</TableHead>
                  <TableHead>Охват</TableHead>
                  <TableHead>Время</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMentions.map((mention) => (
                  <TableRow key={mention.id}>
                    <TableCell className="font-medium">{mention.author}</TableCell>
                    <TableCell className="max-w-md truncate">{mention.content}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        <div className={`w-2 h-2 rounded-full ${getSentimentColor(mention.sentiment)}`}></div>
                        {getSentimentText(mention.sentiment)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Icon name="Eye" className="h-4 w-4 text-muted-foreground" />
                        <span>{mention.views.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>{mention.engagement.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{mention.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}