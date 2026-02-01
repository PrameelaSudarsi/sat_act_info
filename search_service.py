"""
Internet Search Service for SAT Practice
Provides web search capabilities using DuckDuckGo
"""

import requests
from typing import List, Dict, Optional
from duckduckgo_search import DDGS


class SearchService:
    """Service for internet search functionality."""
    
    def __init__(self):
        """Initialize search service."""
        self.ddgs = DDGS()
    
    def search(self, query: str, max_results: int = 5) -> List[Dict]:
        """
        Search the internet for information.
        
        Args:
            query: Search query
            max_results: Maximum number of results to return
            
        Returns:
            List of search results with title, snippet, and URL
        """
        try:
            results = []
            search_results = self.ddgs.text(query, max_results=max_results)
            
            for result in search_results:
                results.append({
                    'title': result.get('title', ''),
                    'snippet': result.get('body', ''),
                    'url': result.get('href', ''),
                })
            
            return results
        except Exception as e:
            print(f"Search error: {e}")
            return []
    
    def search_sat_related(self, topic: str, max_results: int = 5) -> List[Dict]:
        """
        Search for SAT-related content.
        
        Args:
            topic: Topic to search for
            max_results: Maximum number of results
            
        Returns:
            List of SAT-related search results
        """
        query = f"SAT {topic} practice explanation"
        return self.search(query, max_results)
    
    def get_explanation_links(self, question_topic: str) -> List[Dict]:
        """
        Get explanation links for a specific question topic.
        
        Args:
            question_topic: Topic of the question
            
        Returns:
            List of explanation links
        """
        query = f"SAT {question_topic} explanation tutorial"
        return self.search(query, max_results=3)


class YouTubeService:
    """Service for YouTube video search and embedding."""
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize YouTube service.
        
        Args:
            api_key: Optional YouTube API key (if not provided, uses web scraping)
        """
        self.api_key = api_key
    
    def search_videos(self, query: str, max_results: int = 5) -> List[Dict]:
        """
        Search for YouTube videos.
        
        Args:
            query: Search query
            max_results: Maximum number of results
            
        Returns:
            List of video results with title, description, and video ID
        """
        try:
            from yt_dlp import YoutubeDL
            
            ydl_opts = {
                'quiet': True,
                'extract_flat': True,
                'default_search': 'ytsearch',
                'max_results': max_results,
            }
            
            videos = []
            with YoutubeDL(ydl_opts) as ydl:
                search_results = ydl.extract_info(query, download=False)
                
                if 'entries' in search_results:
                    for entry in search_results['entries']:
                        if entry:
                            video_id = entry.get('id', '')
                            title = entry.get('title', '')
                            url = f"https://www.youtube.com/watch?v={video_id}"
                            
                            videos.append({
                                'video_id': video_id,
                                'title': title,
                                'url': url,
                                'embed_url': f"https://www.youtube.com/embed/{video_id}",
                            })
            
            return videos
        except Exception as e:
            print(f"YouTube search error: {e}")
            # Fallback: return search query for manual lookup
            return [{
                'video_id': None,
                'title': f"Search YouTube for: {query}",
                'url': f"https://www.youtube.com/results?search_query={query.replace(' ', '+')}",
                'embed_url': None,
            }]
    
    def search_sat_explanations(self, topic: str, max_results: int = 3) -> List[Dict]:
        """
        Search for SAT explanation videos.
        
        Args:
            topic: Topic to search for
            max_results: Maximum number of results
            
        Returns:
            List of SAT explanation videos
        """
        query = f"SAT {topic} explanation tutorial"
        return self.search_videos(query, max_results)
    
    def get_video_embed_url(self, video_id: str) -> str:
        """
        Get embed URL for a YouTube video.
        
        Args:
            video_id: YouTube video ID
            
        Returns:
            Embed URL
        """
        return f"https://www.youtube.com/embed/{video_id}"
