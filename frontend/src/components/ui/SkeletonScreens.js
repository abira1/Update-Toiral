import React from 'react';
import { cn } from "../../lib/utils";
import { Skeleton } from "./skeleton";

// Base skeleton component with animation
export const AnimatedSkeleton = ({ className, ...props }) => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]",
      "animate-[shimmer_2s_infinite]",
      className
    )}
    {...props}
  />
);

// Hero section skeleton
export const HeroSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
    <div className="max-w-6xl mx-auto px-6 text-center space-y-8">
      {/* Logo skeleton */}
      <AnimatedSkeleton className="h-32 w-32 mx-auto rounded-full" />
      
      {/* Title skeleton */}
      <div className="space-y-4">
        <AnimatedSkeleton className="h-8 w-96 mx-auto" />
        <AnimatedSkeleton className="h-6 w-80 mx-auto" />
      </div>
      
      {/* Description skeleton */}
      <div className="space-y-2">
        <AnimatedSkeleton className="h-4 w-full max-w-2xl mx-auto" />
        <AnimatedSkeleton className="h-4 w-5/6 max-w-2xl mx-auto" />
        <AnimatedSkeleton className="h-4 w-4/6 max-w-2xl mx-auto" />
      </div>
      
      {/* Button skeleton */}
      <AnimatedSkeleton className="h-12 w-48 mx-auto rounded-2xl" />
    </div>
  </div>
);

// Services section skeleton
export const ServicesSkeleton = () => (
  <div className="py-24 bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50">
    <div className="max-w-6xl mx-auto px-6">
      {/* Section header */}
      <div className="text-center mb-16 space-y-4">
        <AnimatedSkeleton className="h-8 w-64 mx-auto" />
        <AnimatedSkeleton className="h-4 w-96 mx-auto" />
      </div>
      
      {/* Services grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 space-y-4">
            <AnimatedSkeleton className="h-12 w-12 rounded-lg" />
            <AnimatedSkeleton className="h-6 w-3/4" />
            <div className="space-y-2">
              <AnimatedSkeleton className="h-4 w-full" />
              <AnimatedSkeleton className="h-4 w-5/6" />
              <AnimatedSkeleton className="h-4 w-4/6" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, j) => (
                <AnimatedSkeleton key={j} className="h-6 w-20 rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Projects section skeleton
export const ProjectsSkeleton = () => (
  <div className="py-24 bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50">
    <div className="max-w-6xl mx-auto px-6">
      {/* Section header */}
      <div className="text-center mb-16 space-y-4">
        <AnimatedSkeleton className="h-8 w-64 mx-auto" />
        <AnimatedSkeleton className="h-4 w-96 mx-auto" />
      </div>
      
      {/* Projects grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
            <AnimatedSkeleton className="h-64 w-full" />
            <div className="p-6 space-y-4">
              <AnimatedSkeleton className="h-6 w-3/4" />
              <div className="space-y-2">
                <AnimatedSkeleton className="h-4 w-full" />
                <AnimatedSkeleton className="h-4 w-5/6" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, j) => (
                  <AnimatedSkeleton key={j} className="h-6 w-16 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Team section skeleton
export const TeamSkeleton = () => (
  <div className="py-24 bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50">
    <div className="max-w-6xl mx-auto px-6">
      {/* Section header */}
      <div className="text-center mb-16 space-y-4">
        <AnimatedSkeleton className="h-8 w-64 mx-auto" />
        <AnimatedSkeleton className="h-4 w-96 mx-auto" />
      </div>
      
      {/* Team grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
            <AnimatedSkeleton className="h-80 w-full" />
            <div className="p-6 space-y-4">
              <AnimatedSkeleton className="h-6 w-3/4" />
              <AnimatedSkeleton className="h-4 w-1/2" />
              <div className="space-y-2">
                <AnimatedSkeleton className="h-4 w-full" />
                <AnimatedSkeleton className="h-4 w-5/6" />
              </div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, j) => (
                  <AnimatedSkeleton key={j} className="h-8 w-8 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Contact section skeleton
export const ContactSkeleton = () => (
  <div className="py-24 bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50">
    <div className="max-w-4xl mx-auto px-6">
      {/* Section header */}
      <div className="text-center mb-16 space-y-4">
        <AnimatedSkeleton className="h-8 w-64 mx-auto" />
        <AnimatedSkeleton className="h-4 w-96 mx-auto" />
      </div>
      
      {/* Contact form */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatedSkeleton className="h-12 w-full rounded-lg" />
          <AnimatedSkeleton className="h-12 w-full rounded-lg" />
        </div>
        <AnimatedSkeleton className="h-12 w-full rounded-lg" />
        <AnimatedSkeleton className="h-32 w-full rounded-lg" />
        <AnimatedSkeleton className="h-12 w-32 rounded-lg" />
      </div>
    </div>
  </div>
);

// Full page skeleton for Home
export const HomePageSkeleton = () => (
  <div className="min-h-screen">
    <HeroSkeleton />
    <ServicesSkeleton />
    <ProjectsSkeleton />
    <TeamSkeleton />
    <ContactSkeleton />
  </div>
);

// Portfolio page skeleton
export const PortfolioPageSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50">
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8 space-y-4">
        <AnimatedSkeleton className="h-8 w-64" />
        <AnimatedSkeleton className="h-4 w-96" />
      </div>
      
      {/* Filters */}
      <div className="mb-8 flex gap-4">
        <AnimatedSkeleton className="h-10 w-32 rounded-lg" />
        <AnimatedSkeleton className="h-10 w-32 rounded-lg" />
        <AnimatedSkeleton className="h-10 w-32 rounded-lg" />
      </div>
      
      {/* Projects grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
            <AnimatedSkeleton className="h-64 w-full" />
            <div className="p-6 space-y-4">
              <AnimatedSkeleton className="h-6 w-3/4" />
              <div className="space-y-2">
                <AnimatedSkeleton className="h-4 w-full" />
                <AnimatedSkeleton className="h-4 w-5/6" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, j) => (
                  <AnimatedSkeleton key={j} className="h-6 w-16 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default {
  HeroSkeleton,
  ServicesSkeleton,
  ProjectsSkeleton,
  TeamSkeleton,
  ContactSkeleton,
  HomePageSkeleton,
  PortfolioPageSkeleton,
  AnimatedSkeleton
};
