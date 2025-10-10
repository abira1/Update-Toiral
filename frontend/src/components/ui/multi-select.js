import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, X, Search, Zap } from 'lucide-react';
import { Badge } from './badge';
import { Button } from './button';
import { Input } from './input';

const MultiSelect = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Select technologies...",
  searchPlaceholder = "Search technologies...",
  className = "",
  maxDisplayed = 5,
  categorized = false,
  categories = {},
  popularStacks = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('popular');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getFilteredOptions = () => {
    if (activeTab === 'popular') {
      return Object.keys(popularStacks);
    } else if (activeTab === 'all') {
      return options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (categorized && categories[activeTab]) {
      return categories[activeTab].filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [];
  };

  const filteredOptions = getFilteredOptions();

  const handleToggleOption = (option) => {
    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  const handleRemoveOption = (option, e) => {
    e.stopPropagation();
    const newValue = value.filter(v => v !== option);
    onChange(newValue);
  };

  const handleSelectStack = (stackOptions) => {
    const newValue = [...new Set([...value, ...stackOptions])];
    onChange(newValue);
    setIsOpen(false);
  };

  const displayedValues = value.slice(0, maxDisplayed);
  const remainingCount = value.length - maxDisplayed;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected Values Display */}
      <div
        className="min-h-[42px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm cursor-pointer flex flex-wrap gap-1 items-center hover:border-primary/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length === 0 ? (
          <span className="text-muted-foreground flex items-center gap-2">
            <Zap className="w-4 h-4" />
            {placeholder}
          </span>
        ) : (
          <>
            {displayedValues.map((option) => (
              <Badge
                key={option}
                variant="secondary"
                className="text-xs flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20"
              >
                {option}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-destructive transition-colors"
                  onClick={(e) => handleRemoveOption(option, e)}
                />
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Badge variant="outline" className="text-xs bg-muted">
                +{remainingCount} more
              </Badge>
            )}
          </>
        )}
        <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-popover border rounded-lg shadow-xl max-h-96 overflow-hidden">
          {/* Search Input - Only show when not on popular tab */}
          {activeTab !== 'popular' && (
            <div className="p-3 border-b bg-muted/30">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-0 bg-background/50"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Simple Category Tabs */}
          <div className="flex border-b bg-background">
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'popular'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-muted-foreground'
              }`}
              onClick={() => setActiveTab('popular')}
            >
              <Zap className="w-4 h-4 inline mr-2" />
              Popular
            </button>
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-muted-foreground'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All ({options.length})
            </button>
            {categorized && Object.keys(categories).slice(0, 2).map((category) => (
              <button
                key={category}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === category
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
                onClick={() => setActiveTab(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="max-h-64 overflow-y-auto">
            {activeTab === 'popular' ? (
              /* Popular Stacks */
              <div className="p-4">
                <div className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                  Quick Select Popular Stacks
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(popularStacks).map(([stackName, stackOptions]) => (
                    <Button
                      key={stackName}
                      variant="outline"
                      size="sm"
                      className="justify-start text-left h-auto p-3 hover:bg-primary/10 hover:border-primary/50"
                      onClick={() => handleSelectStack(stackOptions)}
                    >
                      <div>
                        <div className="font-medium text-sm">{stackName}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {stackOptions.slice(0, 2).join(', ')}
                          {stackOptions.length > 2 && ` +${stackOptions.length - 2}`}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              /* Individual Options */
              filteredOptions.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground text-sm">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  No technologies found
                </div>
              ) : (
                <div className="p-2">
                  {filteredOptions.map((option) => (
                    <div
                      key={option}
                      className="flex items-center px-3 py-2 cursor-pointer hover:bg-muted rounded-md text-sm transition-colors"
                      onClick={() => handleToggleOption(option)}
                    >
                      <div className={`w-4 h-4 border rounded mr-3 flex items-center justify-center transition-colors ${
                        value.includes(option) ? 'bg-primary border-primary' : 'border-input'
                      }`}>
                        {value.includes(option) && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <span className={`transition-colors ${value.includes(option) ? 'font-medium text-primary' : ''}`}>
                        {option}
                      </span>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>

          {/* Footer */}
          {value.length > 0 && (
            <div className="p-3 border-t bg-muted/30 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {value.length} technolog{value.length === 1 ? 'y' : 'ies'} selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm h-8 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => onChange([])}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
