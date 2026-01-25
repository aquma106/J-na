import { useState } from 'react';
import { Edit2, Trash2, Eye, EyeOff, ExternalLink, Award, Play, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PortfolioContent } from '@/hooks/usePortfolioContent';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ContentCardProps {
  content: PortfolioContent;
  onEdit: (content: PortfolioContent) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string, isVisible: boolean) => void;
}

const ContentCard = ({ content, onEdit, onDelete, onToggleVisibility }: ContentCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const getCategoryIcon = () => {
    switch (content.type) {
      case 'video': return <Play className="w-5 h-5" />;
      case 'website': return <Globe className="w-5 h-5" />;
      case 'certificate': return <Award className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(content.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`bg-card border border-border rounded-xl overflow-hidden transition-all ${!content.is_visible ? 'opacity-60' : ''}`}>
      {/* Media Preview */}
      <div className="aspect-video relative bg-muted overflow-hidden">
        {content.media_url ? (
          <img 
            src={content.media_url} 
            alt={content.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            {getCategoryIcon()}
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs bg-background/90 backdrop-blur-sm border border-border flex items-center gap-1.5">
          {getCategoryIcon()}
          <span className="capitalize">{content.type}</span>
        </div>

        {/* Visibility Badge */}
        {!content.is_visible && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs bg-destructive/90 text-destructive-foreground">
            Hidden
          </div>
        )}
      </div>

      {/* Content Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{content.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{content.description}</p>

        {/* Tags */}
        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {content.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                {tag}
              </span>
            ))}
            {content.tags.length > 3 && (
              <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                +{content.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(content)}
            className="flex-1"
          >
            <Edit2 size={14} className="mr-1" />
            Edit
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleVisibility(content.id, !content.is_visible)}
            className="px-3"
          >
            {content.is_visible ? <EyeOff size={14} /> : <Eye size={14} />}
          </Button>

          {content.external_link && (
            <a
              href={content.external_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="px-3">
                <ExternalLink size={14} />
              </Button>
            </a>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="px-3 text-destructive hover:text-destructive">
                <Trash2 size={14} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Content</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{content.title}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
